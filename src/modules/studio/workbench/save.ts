// Bestand aan de bezoeker geven. Op de site: gewone download.
// In de privé-proefversie (claude.ai-artifact, PUBLIC_ARTIFACT=1) mag een pagina zelf niets downloaden;
// daar gaat het via de downloads-functie van de viewer, en een 3MF in een zip (alleen .zip is toegestaan).
import { zipSync } from 'fflate';

type Downloads = { save(r: { filename: string; data: Uint8Array }): Promise<unknown> };
type ClaudeWindow = { claude?: { use(name: 'downloads'): Promise<Downloads | null> } };

function browserDownload(bytes: Uint8Array, filename: string) {
  const url = URL.createObjectURL(new Blob([bytes as BlobPart], { type: 'application/octet-stream' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

export async function saveFile(bytes: Uint8Array, filename: string): Promise<string> {
  if (import.meta.env.PUBLIC_ARTIFACT === '1') {
    const downloads = await (window as unknown as ClaudeWindow).claude?.use('downloads');
    if (downloads) {
      const isZip = filename.endsWith('.zip');
      const name = isZip ? filename : `${filename}.zip`;
      await downloads.save({ filename: name, data: isZip ? bytes : zipSync({ [filename]: bytes }) });
      return name;
    }
  }
  browserDownload(bytes, filename);
  return filename;
}
