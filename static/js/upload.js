    document.addEventListener('DOMContentLoaded', function() {
        const dropArea = document.getElementById('drop-area');
        const fileInput = document.getElementById('file-input');
        const filePrompt = document.getElementById('file-prompt');
        const fileInfo = document.getElementById('file-info');
        const fileName = document.getElementById('file-name');
        const removeFileBtn = document.getElementById('remove-file');
        const uploadButton = document.getElementById('upload-button');

        if (!dropArea || !fileInput || !filePrompt || !fileInfo || !fileName || !removeFileBtn || !uploadButton) {
            console.error('One or more elements not found');
            return;
        }

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        function highlight() {
            console.log('Highlight');
            dropArea.classList.add('bg-gray-100');
        }

        function unhighlight() {
            console.log('Unhighlight');
            dropArea.classList.remove('bg-gray-100');
        }

        function handleDrop(e) {
            console.log('File dropped');
            const dt = e.dataTransfer;
            const files = dt.files;
            handleFiles(files);
        }

        function handleFiles(files) {
          if (files.length > 0) {
            const MAX_SIZE = 100 * 1024 * 1024; // 100MB in bytes
            const selectedFile = files[0];
            // Check if the selected file is an AVIF
            if (selectedFile.type !== 'image/avif') {
                alert('Only AVIF files are allowed!');
                fileInput.value = ''; // Clear file selection
                return;
            }
            // Check if the selected file is too big
            if (selectedFile.size > MAX_SIZE) {
                alert("File is too big! Maximum size allowed is 16MB.");
                fileInput.value = ''; // Clear file selection
                return;
            }
            fileInput.files = files;
            updateFileInfo();
          }
        }

        function updateFileInfo() {
            if (fileInput.files.length > 0) {
                fileName.textContent = fileInput.files[0].name;
                filePrompt.classList.add('hidden');
                fileInfo.classList.remove('hidden');
                uploadButton.disabled = false;
            } else {
                filePrompt.classList.remove('hidden');
                fileInfo.classList.add('hidden');
                uploadButton.disabled = true;
            }
        }

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, preventDefaults, false);
            document.body.addEventListener(eventName, preventDefaults, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, highlight, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, unhighlight, false);
        });

        dropArea.addEventListener('drop', handleDrop, false);

        fileInput.addEventListener('change', updateFileInfo);

        removeFileBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            fileInput.value = '';
            updateFileInfo();
        });

        // 调试
        dropArea.addEventListener('dragenter', () => console.log('Drag Enter'));
        dropArea.addEventListener('dragover', () => console.log('Drag Over'));
        dropArea.addEventListener('dragleave', () => console.log('Drag Leave'));
        dropArea.addEventListener('drop', () => console.log('Drop'));
    });

