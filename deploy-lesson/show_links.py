import json

def show_ui_links():

    with open('/home/workspace/.metaflowconfig/config.json') as f:
        url = json.load(f)['SANDBOX_VSCODE_URL']
        _, base = url.split('-', 1)
        argo = f'https://argo-{base}/workflows'
        mfgui = f'https://ui-{base}'

    from IPython.core.display import HTML, display
    display(HTML(f'<h2>🚀 Flow triggered! 🚀<p><a href="{argo}">See the run on Argo Workflows UI</a></p><p><a href="{mfgui}">See the run on Metaflow UI</a> (after a few seconds)</h2>'))
