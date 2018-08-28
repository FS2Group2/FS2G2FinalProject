package peddle;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.amazonaws.services.s3.model.S3Object;
import com.google.common.io.ByteStreams;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;

public class Store {
    final AmazonS3 s3 = AmazonS3ClientBuilder.standard()
            .withCredentials(new AWSStaticCredentialsProvider(
                    new BasicAWSCredentials(
                            "AKIAJRGGB73QYKFOHFBA",    // put your key from aws console
                            "cVz6/7qwevCkMPQeWJBA9q0UpPTpbpVfWUzLDR+2"))) // put your key from aws console
            .withRegion("us-west-2") .build() ;

//    public static void main(String[] args) throws IOException {
//        String fileName = "README.md";
//        URL file = Store.class.getClassLoader().getResource(fileName);
//        InputStream data = file.openStream();
//
//        Store store = new Store();
//        store.save(fileName, data);
//        String loaded = store.load(fileName);
//        System.out.println(String.valueOf(loaded));
//    }

    private String load(String id) throws IOException {
        S3Object object = s3.getObject("peddle-storage", id);
        InputStream contentStream = object.getObjectContent();
        byte[] contentBytes = ByteStreams.toByteArray(contentStream);
        return new String(contentBytes);
    }
    private void save(String id, InputStream input) {
        PutObjectResult result = s3.putObject(
                "peddle-storage", // bucket name
                id, // key
                input,  // data
                new ObjectMetadata());
    }
}
