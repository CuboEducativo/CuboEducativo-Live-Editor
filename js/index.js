document.addEventListener("DOMContentLoaded", function () {
  var htmlEditor = CodeMirror.fromTextArea(
    document.getElementById("html-code"),
    {
      lineNumbers: true,
      mode: "xml",
      theme: "default",
    }
  );
  var cssEditor = CodeMirror.fromTextArea(document.getElementById("css-code"), {
    lineNumbers: true,
    mode: "css",
    theme: "default",
  });
  var jsEditor = CodeMirror.fromTextArea(document.getElementById("js-code"), {
    lineNumbers: true,
    mode: "javascript",
    theme: "default",
  });

  window.runCode = function () {
    var htmlCode = htmlEditor.getValue();
    var cssCode = cssEditor.getValue();
    var jsCode = jsEditor.getValue();

    var output = document.getElementById("output");
    var srcDoc = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <style>${cssCode}</style>
                    </head>
                    <body>
                        ${htmlCode}
                        <script>${jsCode}<\/script>
                    </body>
                    </html>
                `;

    output.srcdoc = srcDoc;

    // Logging to console for debugging purposes
    console.log("HTML Code:", htmlCode);
    console.log("CSS Code:", cssCode);
    console.log("JavaScript Code:", jsCode);
  };
});
