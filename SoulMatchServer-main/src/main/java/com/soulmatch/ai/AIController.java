package com.soulmatch.ai;

import com.google.gson.*;
import org.apache.commons.codec.binary.Base64;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class AIController {

    private static final Gson GSON = new GsonBuilder().setPrettyPrinting().disableHtmlEscaping().create();
    private static final String API_ENDPOINT = "https://ai-danger-hot-or-not.hf.space/api/predict";
    private static final HttpClient CLIENT = HttpClient.newBuilder().version(HttpClient.Version.HTTP_2).build();

    public static int predictScore(String image) {
        String prefix = "png";
        if (image.toLowerCase().endsWith(".jpg") || image.toLowerCase().endsWith(".jpeg")) {
            prefix = "jpeg";
        }


        AIData aiData = new AIData();

        Path filesPath = Paths.get("files").resolve(image);
        File file = new File(filesPath.toUri());

        try (FileInputStream fileInputStreamReader = new FileInputStream(file)) {
            byte[] bytes = fileInputStreamReader.readAllBytes();

            String base64Image = new String(Base64.encodeBase64(bytes), StandardCharsets.UTF_8);
            aiData.addData("data:image/" + prefix + ";base64," + base64Image);
            aiData.addData("person");
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }

        if (aiData.getData().size() > 0) {
            String body = GSON.toJson(aiData);

            HttpRequest request = HttpRequest.newBuilder()
                    .POST(HttpRequest.BodyPublishers.ofString(body))
                    .header("Content-Type", "application/json")
                    .headers("Accept", "application/json")
                    .uri(URI.create(API_ENDPOINT))
                    .build();

            try {
                HttpResponse<String> response = CLIENT.send(request, HttpResponse.BodyHandlers.ofString());

                if (response.statusCode() == 200) {
                    JsonObject json = JsonParser.parseString(response.body()).getAsJsonObject();
                    JsonArray array = json.get("data").getAsJsonArray();
                    String attractiveness = array.get(array.size() - 1).getAsString();

                    return (int) (Double.parseDouble(attractiveness) / 10.0);
                }
            } catch (IOException | InterruptedException e) {
                System.out.println(e.getMessage());
            }
        }

        return 0;
    }

    private static class AIData {
        private List<String> data = new ArrayList<>();

        public void addData(String dataStr) {
            this.data.add(dataStr);
        }

        public List<String> getData() {
            return data;
        }

        public void setData(List<String> data) {
            this.data = data;
        }
    }
}
