interface PdfViewerProps {
  fileId: string;
}

export default function PdfViewer({ fileId }: PdfViewerProps) {
  const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;

  return (
    <iframe
      src={embedUrl}
      width="100%"
      height="600px"
      style={{ border: "none" }}
      allow="autoplay"
    />
  );
}