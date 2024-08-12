import { elementToSVG, inlineResources } from 'dom-to-svg';

/**
 * Converts a DOM element to an SVG string.
 * @param element - The DOM element to convert.
 * @returns A promise that resolves to the SVG string.
 */
async function DomToSvg(element: Element): Promise<string> {
  // Convert the DOM element to an SVG document
  const svgDocument = elementToSVG(element);

  // Inline all external resources (e.g., images, styles) into the SVG
  await inlineResources(svgDocument.documentElement);

  // Attributes to be removed from text elements
  const unnecessaryAttributesInText = [
      'dominant-baseline', 'font-size-adjust', 'font-stretch', 'font-variant',
      'direction', 'unicode-bidi', 'writing-mode', 'text-rendering', 'user-select'
  ];

  // Select all text elements in the SVG
  const textElements = svgDocument.querySelectorAll('text');

  // Remove unnecessary attributes from each text element
  textElements.forEach(textElement => {
      unnecessaryAttributesInText.forEach(attr => {
          if (textElement.hasAttribute(attr)) {
              textElement.removeAttribute(attr);
          }
      });
  });

  // Attributes to be removed from group (g) elements
  const unnecessaryAttributesInG = [
      'data-stacking-layer', 'data-stacking-context', 'data-z-index',
  ];

  // Select all group (g) elements in the SVG
  const gElements = svgDocument.querySelectorAll('g');

  // Remove unnecessary attributes and empty group elements
  gElements.forEach(gElement => {
      unnecessaryAttributesInG.forEach(attr => {
          if (gElement.hasAttribute(attr)) {
              gElement.removeAttribute(attr);
          }
      });

      // If the group element does not have a 'tag' dataset attribute, move its children up and remove the group
      if (!gElement.dataset['tag']) {
          gElement.parentNode?.prepend(...Array.from(gElement.childNodes));
          gElement.remove();
      }
  });

  // Serialize the SVG document to a string and return it
  return new XMLSerializer().serializeToString(svgDocument);
}

/**
 * Downloads a Blob object as a file.
 * @param blob - The Blob object to download.
 * @param filename - The name of the file to save.
 */
async function downloadBlob(blob: Blob, filename: string): Promise<void> {
  if (typeof window.showSaveFilePicker !== 'undefined') {
      // Use the File System Access API if available
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
      // Fallback for browsers that do not support the File System Access API
      const objectUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Revoke the object URL after a delay to free up memory
      setTimeout(() => URL.revokeObjectURL(objectUrl), 5000);
  }
}

/**
 * Converts a DOM element to an SVG string and downloads it as a file.
 * @param element - The DOM element to convert.
 * @param isSvgRaw - Whether to use the raw outer HTML of the element as the SVG string.
 */
export async function downloadSVG(element: Element, isSvgRaw: boolean = false): Promise<void> {
  const svgString = isSvgRaw ? element.outerHTML : await DomToSvg(element);

  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  await downloadBlob(blob, 'result.svg');
}
