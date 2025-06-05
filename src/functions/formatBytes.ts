/**
 * Modifica i byte formattandoli in dimensioni piu grandi
 * es. byte in KB,MB,GB
 * @param bytes
 * @param decimal di base é 1
 * @returns i byte formattati, con la notazione del peso
 */
function formatBytes(bytes: number, decimal = 1): string {
    if (bytes === 0) return "0 Bytes";

    const sizes = ["Bytes", "KB", "MB", "GB"];

    const i = Math.floor(Math.log(bytes as number) / Math.log(1024));
    return (
        parseFloat(((bytes as number) / Math.pow(1024, i)).toFixed(decimal)) +
        " " +
        sizes[i]
    );
}

export default formatBytes;
