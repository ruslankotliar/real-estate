import { Box, Flex, Input, InputGroup, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const UploadFile = ({ register, errors }) => {
  const [invalidImage, setInvalidImage] = useState(false);
  const [preview, setPreview] = useState(null);

  const setPreviewImage = (image) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.onerror = (error) => {
      console.log(error);
      setPreview(null);
    };
  };

  const onSelectFile = async (e) => {
    const image = e.target.files[0];
    const fileMb = image?.size / 1024 ** 2;
    if (!image) {
      setPreview(null);
      setInvalidImage('Please select image.');
      return;
    } else if (fileMb >= 1) {
      setPreview(null);
      setInvalidImage('File is to large.');
      return;
    } else if (!image.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      setPreview(null);
      setInvalidImage('Please select valid file.');
      return;
    } else {
      setInvalidImage(false);
      setPreviewImage(image);
    }
  };

  return (
    <InputGroup display={'flex'} position={'relative'}>
      <input
        type='file'
        {...register('file', {
          onChange: (e) => onSelectFile(e),
        })}
      />
      <Box height={70}>
        {preview ? (
          <Image
            height={100}
            width={100}
            alt={'Avatar preview'}
            src={preview}
          ></Image>
        ) : (
          ''
        )}
      </Box>
      <Text position={'absolute'} top={10} color={'red.300'} role='alert'>
        {invalidImage && invalidImage}
        {errors.thumbnail && <span>This field is required</span>}
      </Text>
    </InputGroup>
  );
};

export default UploadFile;
