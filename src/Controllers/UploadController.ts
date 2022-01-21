import { Request, Response } from 'express';
import AWS from 'aws-sdk';

import configuration from '../config/environments';
import logger from '../config/logger';
import { sendJSONResponse } from '../utils/helpers';

const { aws } = configuration;
AWS.config.update({
  region: aws.s3.region,
  accessKeyId: aws.s3.accessKeyId,
  secretAccessKey: aws.s3.secretAccessKey,
});

const buketName = aws.s3.bucket;
const directoryMapper: Record<string, string> = {
  article: aws.s3.articleDirectory,
  user: aws.s3.userImageDirectory,
  default: aws.s3.coreImageDirectory,
};

class UploadController {
  static async upload(req: Request, res: Response): Promise<any> {
    logger.info('attempting to upload image');

    if (!req.files) {
      return sendJSONResponse(res, 400, null, 'Image not supplied');
    }
    if (req.files?.length < 1) {
      return sendJSONResponse(res, 400, null, 'upload type required');
    }
    const url = req.files[0].Location;

    return sendJSONResponse(
      res,
      200,
      {
        imageUrl: url,
      },
      'Image Upload Successful',
    );
  }

  static async getSignedRequestUrl(req: Request, res: Response): Promise<any> {
    logger.info('attempting to get signed request url');
    const { fileName, uploadType, fileType, fileExt } = req.body;

    console.log({ fileName, uploadType, fileType, fileExt });

    const directory = directoryMapper[uploadType] || directoryMapper.default;
    logger.info(`requesting signed url for ${directory} directory`);

    const s3 = new AWS.S3();
    const s3Params = {
      Bucket: buketName,
      Key: `${directory}/${fileName}.${fileExt}`,
      ContentType: fileType,
      Expires: 500,
      ACL: 'public-read',
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if (err) {
        logger.error(`Error generating signed url ${err}`);
        return sendJSONResponse(res, 400, { err }, 'Error generating signed url');
      }

      const dataToReturn = {
        signedRequestUrl: data,
        url: s3Params.Key,
      };

      logger.info('signed request url generated successfully');

      return sendJSONResponse(res, 200, { ...dataToReturn }, 'signed Url generated successfully');
    });
  }
}

export default UploadController;
