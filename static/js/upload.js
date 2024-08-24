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
            dropArea.classList.add('bg-gray-100');
        }

        function unhighlight() {
            dropArea.classList.remove('bg-gray-100');
        }

        function handleDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            handleFiles(files);
        }

        function handleFiles(files) {
            if (files.length > 0) {
                const MAX_SIZE = 100 * 1024 * 1024; // 100MB in bytes
                const selectedFile = files[0];

                if (selectedFile.type !== 'image/avif') {
                    alert('Only AVIF files are allowed!');
                    fileInput.value = ''; // Clear file selection
                    return;
                }

                if (selectedFile.size > MAX_SIZE) {
                    alert("File is too big! Maximum size allowed is 100MB.");
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

        dropArea.addEventListener('click', function() {
            fileInput.click();
        });

        fileInput.addEventListener('change', updateFileInfo);

        removeFileBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            fileInput.value = '';
            updateFileInfo();
        });
    });