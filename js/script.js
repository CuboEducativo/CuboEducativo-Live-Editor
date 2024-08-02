$(document).ready(function () {
    const htmlEditor = ace.edit("html-editor");
    htmlEditor.setTheme("ace/theme/monokai");
    htmlEditor.session.setMode("ace/mode/html");

    const cssEditor = ace.edit("css-editor");
    cssEditor.setTheme("ace/theme/monokai");
    cssEditor.session.setMode("ace/mode/css");

    const jsEditor = ace.edit("js-editor");
    jsEditor.setTheme("ace/theme/monokai");
    jsEditor.session.setMode("ace/mode/javascript");

    htmlEditor.setValue(`
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Test Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p id="text">This is a test paragraph.</p>
</body>
</html>`, -1);

    cssEditor.setValue(`
body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    margin: 0;
    padding: 20px;
}
h1 {
    color: #333;
}
#text {
    color: blue;
}`, -1);

    jsEditor.setValue(`
document.getElementById('text').innerText = "This text was changed by JavaScript!";`, -1);

    function updateOutput() {
        let htmlContent = htmlEditor.getValue();
        let cssContent = `<style>${cssEditor.getValue()}</style>`;
        let jsContent = `<script>${jsEditor.getValue()}<\/script>`;
        let iframeContent = htmlContent + cssContent + jsContent;

        let outputFrame = document.getElementById('output-frame');
        let outputDocument = outputFrame.contentDocument || outputFrame.contentWindow.document;
        outputDocument.open();
        outputDocument.write(iframeContent);
        outputDocument.close();
    }

    $('input[type=radio][name=options]').change(function () {
        $('.editor').addClass('d-none');
        if (this.id === 'html-tab') {
            $('#html-editor').removeClass('d-none');
        } else if (this.id === 'css-tab') {
            $('#css-editor').removeClass('d-none');
        } else if (this.id === 'js-tab') {
            $('#js-editor').removeClass('d-none');
        }
    });

    $('#download-btn').click(function () {
        let projectName = $('#project-name').val().trim() || 'project';
        let htmlContent = htmlEditor.getValue();
        let cssContent = `<style>${cssEditor.getValue()}</style>`;
        let jsContent = `<script>${jsEditor.getValue()}<\/script>`;
        let content = htmlContent + cssContent + jsContent;

        let blob = new Blob([content], { type: 'text/html' });
        let url = URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = `${projectName}.html`;
        a.click();
        URL.revokeObjectURL(url);

    });

    function openFullScreen() {
        let htmlContent = htmlEditor.getValue();
        let cssContent = `<style>${cssEditor.getValue()}</style>`;
        let jsContent = `<script>${jsEditor.getValue()}<\/script>`;
        let newWindowContent = htmlContent + cssContent + jsContent;

        let newWindow = window.open();
        newWindow.document.open();
        newWindow.document.write(newWindowContent);
        newWindow.document.close();
    }

    $('#compile-btn').click(updateOutput);
    $('#full-screen-btn').click(openFullScreen);

    updateOutput(); // Initial call to display default content


});
