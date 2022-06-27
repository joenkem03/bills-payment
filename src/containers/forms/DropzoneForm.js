/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import DropzoneComponent from 'react-dropzone-component';
import 'dropzone/dist/min/dropzone.min.css';
import { getCurrentUser } from '../../helpers/Utils';
import {UPLOAD_DOCUMENT} from '../../constants/defaultValues';


const currentUser = getCurrentUser();

const ReactDOMServer = require('react-dom/server');

// const[upFile, setUpFile] = useState("");
// const[upFileDir, setUpFileDir] = useState("");

const dropzoneComponentConfig = {
  // postUrl: 'https://httpbin.org/post',
  postUrl: UPLOAD_DOCUMENT,
  iconFiletypes: ['.pdf'],
  showFiletypeIcon: true,
};
// const dropzoneConfig = {
//   // maxFilesize: 2048,
//   maxFiles: 1,
//   autoProcessQueue: true ,
//   acceptedFiles: '.pdf',
//   thumbnailHeight: 160,
//   maxFilesize: 2,
//   addRemoveLinks: false, 
//   // headers: { Authorization: "Bearer " + localStorage.getItem("token"), },Authorization: `Bearer 
//   headers: {
//             Authorization: "Bearer "+ currentUser?.token,
//           }, 
//   params: {
//     // fileDirectory: fileDirectory,
//     fileDirectory: upFileDir,
//     // fileName: fileName
//     fileName: upFile
//   },
//   previewTemplate: ReactDOMServer.renderToStaticMarkup(
//     <div className="dz-preview dz-file-preview mb-3">
//       <div className="d-flex flex-row ">
//         <div className="p-0 w-30 position-relative">
//           <div className="dz-error-mark">
//             <span>
//               <i />{' '}
//             </span>
//           </div>
//           <div className="dz-success-mark">
//             <span>
//               <i />
//             </span>
//           </div>
//           <div className="preview-container">
//             {/*  eslint-disable-next-line jsx-a11y/alt-text */}
//             <img data-dz-thumbnail className="img-thumbnail border-0" />
//             <i className="simple-icon-doc preview-icon" />
//           </div>
//         </div>
//         <div className="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative">
//           <div>
//             {' '}
//             <span data-dz-name />{' '}
//           </div>
//           <div className="text-primary text-extra-small" data-dz-size />
//           <div className="dz-progress">
//             <span className="dz-upload" data-dz-uploadprogress />
//           </div>
//           <div className="dz-error-message">
//             <span data-dz-errormessage />
//           </div>
//         </div>
//       </div>
//       <a href="#/" className="remove" data-dz-remove>
//         {' '}
//         <i className="glyph-icon simple-icon-trash" />{' '}
//       </a>
//     </div>
//   ),
// };

// export default class DropzoneForm extends Component {
const DropzoneForm = ({ fileDirectory, fileName }) => {
  // const clear = () => {
  //   this.myDropzone.removeAllFiles(true);
  // }
  // clear() {
  //   this.myDropzone.removeAllFiles(true);
  // }

  // DropzoneForm(){
  //   const { fileDirectory } = this.props;
  //   //or
  //   const fileName = this.props.fileName;
  //   setUpFile(fileName);
  //   setUpFileDir(fileDirectory);
  // };

  
const dropzoneConfig = {
  // maxFilesize: 2048,
  maxFiles: 1,
  autoProcessQueue: true ,
  acceptedFiles: '.pdf',
  thumbnailHeight: 160,
  maxFilesize: 2,
  addRemoveLinks: false, 
  // headers: { Authorization: "Bearer " + localStorage.getItem("token"), },Authorization: `Bearer 
  headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          }, 
  params: {
    fileDirectory,
    // fileDirectory: upFileDir,
    fileName
    // fileName: upFile
  },
  previewTemplate: ReactDOMServer.renderToStaticMarkup(
    <div className="dz-preview dz-file-preview mb-3">
      <div className="d-flex flex-row ">
        <div className="p-0 w-30 position-relative">
          <div className="dz-error-mark">
            <span>
              <i />{' '}
            </span>
          </div>
          <div className="dz-success-mark">
            <span>
              <i />
            </span>
          </div>
          <div className="preview-container">
            {/*  eslint-disable-next-line jsx-a11y/alt-text */}
            <img data-dz-thumbnail className="img-thumbnail border-0" />
            <i className="simple-icon-doc preview-icon" />
          </div>
        </div>
        <div className="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative">
          <div>
            {' '}
            <span data-dz-name />{' '}
          </div>
          <div className="text-primary text-extra-small" data-dz-size />
          <div className="dz-progress">
            <span className="dz-upload" data-dz-uploadprogress />
          </div>
          <div className="dz-error-message">
            <span data-dz-errormessage />
          </div>
        </div>
      </div>
      <a href="#/" className="remove" data-dz-remove>
        {' '}
        <i className="glyph-icon simple-icon-trash" />{' '}
      </a>
    </div>
  ),
};

  // render() {
    return (
      <DropzoneComponent
        config={dropzoneComponentConfig}
        djsConfig={dropzoneConfig}
        eventHandlers={{
          // init: (dropzone) => {
          //   myDropzone = dropzone;
          // },
        }}
      />
    );
  // }
}

export default DropzoneForm;
