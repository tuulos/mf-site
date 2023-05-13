from metaflow import step, FlowSpec, trigger, current, Parameter

@trigger(event={'name': "my_event"})
class EventTriggeredFlow(FlowSpec):

    greeting = Parameter('greeting', default='World')

    @step
    def start(self):
        print("Hello %s 👋" % self.greeting)
        self.next(self.end)

    @step
    def end(self):
        print("Done! 🏁")

if __name__ == '__main__':
    EventTriggeredFlow()
