# [Premiers pas avec la génération PDF](https://bazinga-unit.blogspot.com/2012/05/premiers-pas-avec-la-generation-pdf.html)

Dans le cadre de projets, j'ai besoin de générer de manipuler des PDFs pour diverses raisons :  
- génération de pdf à partir d'images  
- génération de pdf à partir de template HTML  
- concaténation de pdf  
- stamping de pdf (entête / pied de page)  

**1\. Les dépendances**  

Pour la génération PDF d'un HTML, je vais utiliser le projet "flyingsaucer" qui utilise derrière le moteur "itext".  
J'ajouterais aussi jtidy car la librairie "flyingsaucer" utilise du XHTML et non pas du HTML et jtidy permet justement de corriger le HTML en XHTML.  

<pre name="code" class="xml"> <dependency><groupid>net.sf.jtidy</groupid>
   <artifactid>jtidy</artifactid>
   <version>r938</version></dependency> 
  <dependency><groupid>de.huxhorn.lilith</groupid>
   <artifactid>de.huxhorn.lilith.3rdparty.flyingsaucer.core-renderer</artifactid>
   <version>8Pre2</version></dependency> 
  <dependency><groupid>com.lowagie</groupid>
   <artifactid>itext</artifactid>

   <version>2.0.8</version></dependency> 
</pre>

**2\. Génération d'un PDF à partir d'un HTML**  

Le code suivant permet de faire tout ça très simplement :  

<pre name="code" class="java">import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.OutputStream;

import org.w3c.tidy.Tidy;
import org.xhtmlrenderer.pdf.ITextRenderer;

public class TestiText {

public static void main(String[] args) throws Exception {
  String root = "src\\test\\resources";
  String input = "test_html_6.html";
  String xhtml_input = "xhmtl" + input;

  //Passage en XHTML
  FileInputStream FIS = new FileInputStream(new File(root, input));
  FileOutputStream FOS = new FileOutputStream(new File(root, xhtml_input));
  Tidy T = new Tidy();
  T.parseDOM(FIS, FOS);

  String output = input.substring(0, input.length() - 4) + "pdf";

  //Passage en PDF
  OutputStream os = null;
  os = new FileOutputStream(new File(root, output));
  ITextRenderer renderer = new ITextRenderer();
  File input2 = new File(root, xhtml_input);
  renderer.setDocument(input2);
  renderer.layout();
  renderer.createPDF(os);
  renderer.finishPDF();
  os.close();
  os = null;
 }
}
</pre>

De base, le format de rendu est du A4 portrait.  

**3\. Génération d'un PDF à partir d'une image**  

Pour une image, c'est pareil, c'est très simple :  

<pre name="code" class="java">public static void main(String[] args) throws Exception {
  String root = "src\\test\\resources\\png";
  String output = root + File.separator + "exemplePNG.pdf";

  Document document = new Document();
  PdfWriter.getInstance(document, new FileOutputStream(output));
  document.setPageSize(PageSize.A3.rotate());
  document.open();

  document.add(new Paragraph("Simple Image"));
  com.lowagie.text.Image image = com.lowagie.text.Image.getInstance(root + File.separator + "SRST-013534-Type_DF-DF-1.png");
  // image.scaleToFit(210.00F, 148.50F);
  image.scalePercent(50);
  document.add(image);
  document.setPageSize(PageSize.A4);
  document.newPage();

  document.add(new Paragraph("Simple2 Image"));
  com.lowagie.text.Image image2 = com.lowagie.text.Image.getInstance(root + File.separator + "SRST-013534-Type_DF-Controle-1_Publication.png");
  document.add(image2);
  document.setPageSize(PageSize.A2);
  document.newPage();

  document.add(new Paragraph("Simple3 Image"));
  com.lowagie.text.Image image3 = com.lowagie.text.Image.getInstance(root + File.separator + "SRST-013534-Type_DF-Controle-1_Metier.png");
  document.add(image3);

  document.close();
 }
</pre>

**4\. Concaténation de PDF**  

La encore, cela reste très lisible :  

<pre name="code" class="java">public static void main(String[] args) throws Exception {
  String root = "src\\test\\resources\\concat" + File.separator;
  String rootPng = "src\\test\\resources\\png" + File.separator;
  String rootGarde = "src\\test\\resources\\pdf" + File.separator;

  String output = root + "ALL.pdf";

  System.out.println("Combines two page");
  List <pdfreader>readers = new ArrayList<pdfreader>();
  PdfReader reader1 = new PdfReader(rootGarde + "NBR-page_garde.pdf");
  PdfReader reader2 = new PdfReader(rootPng + "exemplePNG.pdf");
  PdfReader reader3 = new PdfReader(root + "PaysageA4.pdf");
  PdfReader reader4 = new PdfReader(root + "PortraitA4.pdf");
  PdfReader reader5 = new PdfReader(root + "PaysageA3.pdf");
  PdfReader reader6 = new PdfReader(root + "PortraitA3.pdf");
  readers.add(reader1);
  readers.add(reader2);
  readers.add(reader3);
  readers.add(reader4);
  readers.add(reader5);
  readers.add(reader6);

  PdfCopyFields copy = new PdfCopyFields(new FileOutputStream(output));
  for (PdfReader reader : readers) {
   copy.addDocument(reader);
  }
  copy.close();
 }</pdfreader></pdfreader></pre>

**5\. Stamping de PDF**  

Pour le stamping, le bout de code ci-dessous marche plutôt bien excepté pour l'alignement (centré) du stamping car j'ai remarqué qu'en A3 landscape, cela ne fonctionnait pas (décalé sur la gauche)...  

<pre name="code" class="java">public static void main(String[] args) throws Exception {
  String root = "src\\test\\resources\\stamp2" + File.separator;
  String rootPdf = "src\\test\\resources\\concat" + File.separator + "ALL.pdf";

  String output = root + "ALL_stamping.pdf";

  Document document = new Document();
  // step 2
  PdfCopy copy = new PdfCopy(document, new FileOutputStream(output));
  // step 3
  document.open();
  // step 4
  // reader for document 1
  PdfReader reader1 = new PdfReader(rootPdf);

  int n1 = reader1.getNumberOfPages();
  // initializations
  PdfImportedPage page;
  PdfCopy.PageStamp stamp;
  // Loop over the pages of document 1
  for (int i = 0; i < n1;) {
   page = copy.getImportedPage(reader1, ++i);
   if (i > 1) {
    System.out.println("page>> " + i);
    stamp = copy.createPageStamp(page);
    // add page numbers
    ColumnText.showTextAligned(stamp.getUnderContent(), Element.ALIGN_CENTER, new Phrase(String.format("page %d of %d", i, n1)), 297.5f, 28, 0);
    stamp.alterContents();
   }
   copy.addPage(page);
  }
  // step 5
  document.close();
 }

</pre>

Par contre, les temps sont plutôt bons : 508ms pour 500pages à stamper !  

**6\. Bonus : rendu au format image**  

La librairie flyingsaucer permet aussi de faire un rendu au format image à partir d'un fichier HTML : cela peut être pratique pour des prévisualisations de pages (sur un résultat de recherche par exemple).  

<pre name="code" class="java">public static void main(String[] args) throws Exception {
  String root = "src\\test\\resources";
  String input = "test_html_4.html";
  String xhtml_input = "xhmtl" + input;
  FileInputStream FIS = new FileInputStream(new File(root, input));
  FileOutputStream FOS = new FileOutputStream(new File(root, xhtml_input));
  Tidy T = new Tidy();
  T.parseDOM(FIS, FOS);

  // Generate an image from a file:
  File f = new File(root, xhtml_input);
  int width = 1024;
  int height = 1024;

  // can specify width alone, or width + height
  // constructing does not render; not until getImage() is called
  Java2DRenderer renderer = new Java2DRenderer(f, width, height);

  // this renders and returns the image, which is stored in the J2R; will not
  // be re-rendered, calls to getImage() return the same instance
  BufferedImage img = renderer.getImage();

  // write it out, full size, PNG
  // FSImageWriter instance can be reused for different images,
  // defaults to PNG
  FSImageWriter imageWriter = new FSImageWriter();
  imageWriter.write(img, root + File.separator + "output.png");
}
</pre>
