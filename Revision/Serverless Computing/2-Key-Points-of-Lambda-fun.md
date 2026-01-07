# 🚀 Key Learning About AWS Lambda

One important thing I learned is that AWS Lambda is not suitable for serving files.

- Lambda has a 6 MB response payload limit
- When a file is returned using Base64 encoding, its size increases by ~33% (We convert binary data into base64 because lambda function should return the base64)
- Because of this, the effective safe file size is ~4.5 MB
- Serving larger files from Lambda can cause payload size errors and performance issues

## ✅ Best Practice
Use AWS Lambda only for business logic and:

- Store files in Amazon S3
- Serve them using pre-signed URLs or CloudFront

``` Note : you can increase the size from 6MB to 200MB but you need to change the logic of code because in this we use streams to send data ```
## The Core Problem (Binary Data vs JSON)

AWS Lambda returns data to Amazon API Gateway.
But:
- API Gateway expects JSON or text
- Files like images, PDFs, videos are binary
- JSON cannot safely carry binary data

So we need a safe text format → that’s where Base64 comes in.

```
Note:  When you are deploying fuly backend application like our storage app than you need to divide the route into different lambda function . like file handling have seperate lambda function , auth have seperate function . Because lambda function do cold start . so every time when request will come than it will take more time to start the server. 

```