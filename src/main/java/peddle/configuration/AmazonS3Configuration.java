package peddle.configuration;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@PropertySource("amazon.properties")
@Component
public class AmazonS3Configuration {

  @Value("${Access_key}")
  private String accessKey;

  @Value("${Secret_key}")
  private String secretKey;

  public static final String BUCKET_NAME = "eventtour-bucket";

  public AmazonS3 getAmazonS3() {
    return AmazonS3ClientBuilder.standard()
            .withCredentials(new AWSStaticCredentialsProvider(
                    new BasicAWSCredentials(accessKey,
                            secretKey)))
            .withRegion(Regions.US_EAST_2) .build() ;
  }
}
