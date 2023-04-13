import { Grid, LinearProgress, Button } from '@mui/material';
import { useEffect, useState } from 'react';

export interface FileHeaderProps {
  file: File;
  onDelete: (file: File) => void;
}

export function FileHeader({ file, onDelete }: FileHeaderProps) {
  return (
    <Grid>
      <Grid item>{file?.name}</Grid>
      <Grid item>
        <Button size='small' onClick={() => onDelete(file)}>
          Usuń
        </Button>
      </Grid>
    </Grid>
  );
}

export interface SingleFileUploadWithProgressProps {
  file: File;
  onDelete: (file: File) => void;
  onUpload: (file: File, url: string) => void;
}

export default function FileUploader({
  file,
  onDelete,
  onUpload,
}: SingleFileUploadWithProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function upload() {
      const url = await uploadFile(file, setProgress);
      onUpload(file, url);
    }

    upload();
  }, []);

  return (
    <Grid sx={{height: 70}} item>
      <FileHeader file={file} onDelete={onDelete} />
      <LinearProgress variant='determinate' value={progress} />
    </Grid>
  );
}

function uploadFile(file: File, onProgress: (percentage: number) => void) {
  const url = 'https://api.cloudinary.com/v1_1/demo/image/upload';
  const key = 'docs_upload_example_us_preset';

  return new Promise<string>((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);

    xhr.onload = () => {
      const resp = JSON.parse(xhr.responseText);
      res(resp.secure_url);
    };
    xhr.onerror = (evt) => rej(evt);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = (event.loaded / event.total) * 100;
        onProgress(Math.round(percentage));
      }
    };

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', key);

    xhr.send(formData);
  });
}

// import { Grid, makeStyles } from '@material-ui/core';
// import { useField } from 'formik';
// import React, { useCallback, useEffect, useState } from 'react';
// import { FileError, FileRejection, useDropzone } from 'react-dropzone';
// import { SingleFileUploadWithProgress } from './SingleFileUploadWithProgress';
// import { UploadError } from './UploadError';

// let currentId = 0;

// function getNewId() {
//   // we could use a fancier solution instead of a sequential ID :)
//   return ++currentId;
// }

// export interface UploadableFile {
//   // id was added after the video being released to fix a bug
//   // Video with the bug -> https://youtube-2021-feb-multiple-file-upload-formik-bmvantunes.vercel.app/bug-report-SMC-Alpha-thank-you.mov
//   // Thank you for the bug report SMC Alpha - https://www.youtube.com/channel/UC9C4AlREWdLoKbiLNiZ7XEA
//   id: number;
//   file: File;
//   errors: FileError[];
//   url?: string;
// }

// const useStyles = makeStyles((theme) => ({
//   dropzone: {
//     border: `2px dashed ${theme.palette.primary.main}`,
//     borderRadius: theme.shape.borderRadius,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     background: theme.palette.background.default,
//     height: theme.spacing(10),
//     outline: 'none',
//   },
// }));

// export function MultipleFileUploadField({ name }: { name: string }) {
//   const [_, __, helpers] = useField(name);
//   const classes = useStyles();

//   const [files, setFiles] = useState<UploadableFile[]>([]);
//   const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
//     const mappedAcc = accFiles.map((file) => ({ file, errors: [], id: getNewId() }));
//     const mappedRej = rejFiles.map((r) => ({ ...r, id: getNewId() }));
//     setFiles((curr) => [...curr, ...mappedAcc, ...mappedRej]);
//   }, []);

//   useEffect(() => {
//     helpers.setValue(files);
//     // helpers.setTouched(true);
//   }, [files]);

//   function onUpload(file: File, url: string) {
//     setFiles((curr) =>
//       curr.map((fw) => {
//         if (fw.file === file) {
//           return { ...fw, url };
//         }
//         return fw;
//       })
//     );
//   }

//   function onDelete(file: File) {
//     setFiles((curr) => curr.filter((fw) => fw.file !== file));
//   }

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: ['image/*', 'video/*', '.pdf'],
//     maxSize: 300 * 1024, // 300KB
//   });

//   return (
//     <React.Fragment>
//       <Grid item>
//         <div {...getRootProps({ className: classes.dropzone })}>
//           <input {...getInputProps()} />

//           <p>Drag 'n' drop some files here, or click to select files</p>
//         </div>
//       </Grid>

//       {files.map((fileWrapper) => (
//         <Grid item key={fileWrapper.id}>
//           {fileWrapper.errors.length ? (
//             <UploadError
//               file={fileWrapper.file}
//               errors={fileWrapper.errors}
//               onDelete={onDelete}
//             />
//           ) : (
//             <SingleFileUploadWithProgress
//               onDelete={onDelete}
//               onUpload={onUpload}
//               file={fileWrapper.file}
//             />
//           )}
//         </Grid>
//       ))}
//     </React.Fragment>
//   );
// }
