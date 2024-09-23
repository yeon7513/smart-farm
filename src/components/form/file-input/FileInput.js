import cn from 'classnames';
import React, { useRef, useState } from 'react';
import { MdAddCircle, MdCancel } from 'react-icons/md';
import placeholderImg from '../../../assets/member/profile.webp';
import ImageBox from '../../image-box/ImageBox';
import styles from './FileInput.module.scss';

function FileInput({ name, setFile, value, initialPreview, selected }) {
  const [preview, setPreview] = useState(initialPreview);
  const inputRef = useRef();

  const handleFileChange = (e) => {
    const nextFile = e.target.files[0];
    setFile(name, nextFile);
  };

  const handleClearClick = () => {
    const inputNode = inputRef;
    inputNode.current.value = '';
    setFile(name, null);
  };

  // useEffect(() => {
  //   if (!value) return;

  //   const nextPreview = URL.createObjectURL(value);
  //   setPreview(nextPreview);

  //   return () => {
  //     setPreview(null);
  //     URL.revokeObjectURL(nextPreview);
  //   };
  // }, [value]);

  return (
    <div className={styles.fileInput}>
      <ImageBox isSelected={selected} imgUrl={preview || placeholderImg} />
      <input
        className={styles.hiddenOverlay}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={inputRef}
      />
      {value ? (
        <button
          className={cn(styles.btn, styles.clearBtn)}
          onClick={handleClearClick}
        >
          <MdCancel />
        </button>
      ) : (
        <button className={cn(styles.btn, styles.addBtn)}>
          <MdAddCircle />
        </button>
      )}
    </div>
  );
}

export default FileInput;
