

export const getStaticUrlFile = (fileName) => {
    if (fileName.startsWith("http")) return fileName;
    return `${process.env.REACT_APP_PUBLIC_API_BASE}/download-file/${fileName}`;
}