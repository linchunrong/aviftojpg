/*
function uploadFile(input) {
            const file = input.files[0];
            if (file) {
                const formData = new FormData();
                formData.append('file', file);

                // 使用 fetch 或其他 AJAX 方法将文件上传到服务器
                fetch('upload.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => {
                    console.log('文件上传成功');
                    // 在这里可以处理上传成功后的逻辑
                })
                .catch(error => {
                    console.error('文件上传失败', error);
            function uploadFile() {
                var fileInput = document.getElementById('fileInput');
                var file = fileInput.files[0];
                var formData = new FormData();
                formData.append('file', file);

                fetch('/upload', {
                    method: 'POST',
                    body: formData
                })
                .then(response => {
                    console.log('文件上传成功');
                })
                .catch(error => {
                    console.error('文件上传失败', error);
                });
         function uploadFile() {
                var fileInput = document.getElementById('fileInput');
                var file = fileInput.files[0];
                var formData = new FormData();
                formData.append('file', file);

                fetch('/upload', {
                    method: 'POST',
                    body: formData
                })
                .then(response => {
                    console.log('文件上传成功');
                })
                .catch(error => {
                    console.error('文件上传失败', error);
                });
            }<!---->-->处 action="/"理上传失败后的逻辑
                })
            } else {
                alert('请选择要上传的文件');
            }
        }
            
           document.addEventListener('DOMContentLoaded', function() {
            const fileInput = document.getElementById('fileInput');
            const uploadForm = document.getElementById('uploadForm');

            fileInput.addEventListener('change', function() {
                if (fileInput.files.length > 0) {
                    uploadForm.submit();
                }
            });
        });
*/
         function uploadFile() {
                var fileInput = document.getElementById('fileInput');
                var file = fileInput.files[0];
                var formData = new FormData();
                formData.append('file', file);

                fetch('/', {
                    method: 'POST',
                    body: formData
                })
                .then(response => {
                    console.log('文件上传成功');
                })
                .catch(error => {
                    console.error('文件上传失败', error);
                });
            }