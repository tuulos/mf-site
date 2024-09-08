from metaflow import pypi_base, FlowSpec, step

@pypi_base(python='3.12', packages={
    'datasets': '2.21.0',
    'torch': '2.4.1',
    'transformers': '4.44.2',
    'peft': '0.12.0',
    'trl': '0.10.1',
    'accelerate': '0.34.2',
    'bitsandbytes': '0.43.3',
    'sentencepiece': '0.2.0',
    'safetensors': '0.4.5'
})
class FinetuneLlama3LoRA(FlowSpec):

    @step
    def start(self):
        self.shards = self.load_shards()
        self.next(self.sft, foreach='shards')

    @model
    @checkpoint
    @gpu_profile(interval=1)
    @secrets(sources=["huggingface-token"])
    @nvidia(instance='H100', gpu=8)
    @step
    def sft(self):
        import os
        from my_peft_tools import create_model, create_trainer, save_model, get_tar_bytes
        import huggingface_hub

        huggingface_hub.login(os.environ['HF_TOKEN']) # contained in hugginface-token secret
        model, tokenizer = create_model(self.script_args)
        trainer = create_trainer(self.script_args, tokenizer, model, smoke=self.smoke, card=True)
        trainer.train()
        output_dirname, merge_output_dirname = save_model(self.script_args, trainer)
        self.model = current.model.save(output_dirname)
        if merge_output_dirname:
            current.model.save(merge_output_dirname)
        self.next(self.end)
