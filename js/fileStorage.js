// Handles all localStorage operations
const FileStorage = {
    // Key for localStorage
    STORAGE_KEY: 'fileManagerFiles',

    // Get all stored files
    getFiles() {
        const files = localStorage.getItem(this.STORAGE_KEY);
        return files ? JSON.parse(files) : [];
    },

    // Save files to localStorage
    saveFiles(files) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(files));
    },

    // Add a new file
    addFile(file) {
        const files = this.getFiles();
        files.push(file);
        this.saveFiles(files);
    },

    // Delete a file by name
    deleteFile(fileName) {
        const files = this.getFiles();
        const updatedFiles = files.filter(file => file.name !== fileName);
        this.saveFiles(updatedFiles);
    }
};