package be.technifutur.Labo3.config;

import be.technifutur.Labo3.model.dtos.LogDto;
import be.technifutur.Labo3.model.entities.Log;
import be.technifutur.Labo3.model.repositories.LogRepository;
import be.technifutur.Labo3.model.services.LogService;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.awt.*;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;
import java.util.List;

@Component
public class PDFManager implements InitializingBean {

    @Value("${folders.pdf}")
    private String pdfFolder;

    private final int sizeX = 595;
    private final int sizeY = 842;

    private final int leading = 4;//interligne

    private int nbPage = 0;
    private int nbLog = 0;

    private final int fontSize = 20;

    private final int initialCoordX = 16;
    private final int initialCoordY = 770;

    int newCoordY = initialCoordY;

    private final LogService logService;

    public PDFManager(LogService logService) {
        this.logService = logService;
    }

    @Override
    public void afterPropertiesSet() throws Exception {

        Path pdfPath = Paths.get(pdfFolder);

        if(!Files.exists(pdfPath)) {

            Files.createDirectories(pdfPath);

        }

    }

    public void generateToPdf(List<String> stringList) throws IOException {

        File file = new File("pdf\\log.pdf");

        PDDocument pdDocument = PDDocument.load(file);

        if (newCoordY <= (fontSize + leading)*5) {

            PDPage page = new PDPage();
            pdDocument.addPage(page);
            nbPage++;
            newCoordY = initialCoordY;

        }

        PDPage pdPage = pdDocument.getPage(nbPage);

        stringList.forEach(string -> {

            newCoordY-= fontSize + leading;

            try {

                addLineTextToPage(pdDocument, pdPage, string, initialCoordX, newCoordY, PDType1Font.HELVETICA, fontSize);
                nbLog++;

            } catch (IOException e) {

                e.printStackTrace();

            }

        });

        pdDocument.save("pdf\\log.pdf");

        pdDocument.close();

    }

    public void addLineTextToPage(PDDocument document, PDPage page, String log, Integer coordX, Integer coordY, PDType1Font font, int fontSize) throws IOException {

        PDPageContentStream contentStream = new PDPageContentStream(document, page, PDPageContentStream.AppendMode.APPEND, true, true);

        contentStream.beginText();
        contentStream.setFont(font, fontSize);
        contentStream.setLeading(fontSize + leading);
        contentStream.newLineAtOffset(coordX, coordY);
        contentStream.showText(log);
        contentStream.newLine();
        contentStream.endText();

        contentStream.close();

    }

    public void createDocument() throws IOException {

        PDDocument document = new PDDocument();
        PDPage page = new PDPage();

        document.addPage(page);
        document.save("pdf\\log.pdf");
        document.close();

    }

}
