import { elementToSVG, inlineResources } from 'dom-to-svg';

async function DomToSvg(element: Element) {
  const svgDocument = elementToSVG(element);
  await inlineResources(svgDocument.documentElement);

  return new XMLSerializer().serializeToString(svgDocument);
}

async function downloadBlob(blob: Blob, filename: string) {
  if (typeof window.showSaveFilePicker !== 'undefined') {
    const handle = await window.showSaveFilePicker({
      types: [
        {
          description: 'SVG File',
          accept: { 'image/svg': ['.svg'] },
        },
      ],
      suggestedName: filename,
    });

    const writable = await handle.createWritable();
    await writable.write(blob);
    await writable.close();
  } else {
    const objectUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => URL.revokeObjectURL(objectUrl), 5000);
  }
}

export async function downloadSVG(element: Element, isSvgRaw: boolean = false) {
  const svgString = isSvgRaw ? element.outerHTML : await DomToSvg(element);

  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  downloadBlob(blob, 'result.svg');
}
