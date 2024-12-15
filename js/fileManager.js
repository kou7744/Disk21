// Handles file operations and UI updates
const FileManager = {
    // Convert file size to readable format
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },

    // Create file row HTML
    createFileRow(file) {
        return `
            <tr>
                <td>${file.name}</td>
                <td>${this.formatFileSize(file.size)}</td>
                <td>
                    <a href="#" class="download-btn" data-filename="${file.name}">Download</a>
                    <a href="#" class="delete-btn" data-filename="${file.name}">Delete</a>
                </td>
            </tr>
        `;
    },

    // Update the file list in the UI
    updateFileList() {
        const fileTableBody = document.getElementById('fileTableBody');
        const files = FileStorage.getFiles();
        
        fileTableBody.innerHTML = files.map(file => this.createFileRow(file)).join('');
    },

    // Handle file upload
    handleFileUpload(fileList) {
        Array.from(fileList).forEach(file => {
            const fileData = {
                name: file.name,
                size: file.size,
                type: file.type,
                content: null
            };

            // Read file content
            const reader = new FileReader();
            reader.onload = (e) => {
                fileData.content = e.target.result;
                FileStorage.addFile(fileData);
                this.updateFileList();
            };
            reader.readAsDataURL(file);
        });
    },

    // Handle file deletion
    handleFileDelete(fileName) {
        FileStorage.deleteFile(fileName);
        this.updateFileList();
    },

    // Handle file download
    handleFileDownload(fileName) {
        const files = FileStorage.getFiles();
        const file = files.find(f => f.name === fileName);
        
        if (file && file.content) {
            const link = document.createElement('a');
            link.href = file.content;
            link.download = file.name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
};