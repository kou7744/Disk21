// Main application logic and event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initial file list update
    FileManager.updateFileList();

    // Handle file upload form submission
    document.getElementById('uploadForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const fileInput = document.getElementById('fileInput');
        if (fileInput.files.length > 0) {
            FileManager.handleFileUpload(fileInput.files);
            fileInput.value = ''; // Reset file input
        }
    });

    // Handle file actions (delete and download)
    document.getElementById('fileTableBody').addEventListener('click', (e) => {
        e.preventDefault();
        const fileName = e.target.dataset.filename;
        
        if (e.target.classList.contains('delete-btn')) {
            FileManager.handleFileDelete(fileName);
        } else if (e.target.classList.contains('download-btn')) {
            FileManager.handleFileDownload(fileName);
        }
    });
});