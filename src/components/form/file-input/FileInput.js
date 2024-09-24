import cn from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { MdCancel } from 'react-icons/md';
import placeholderImg from '../../../assets/member/profile.webp';
import ImageBox from '../../image-box/ImageBox';
import styles from './FileInput.module.scss';

function FileInput({
  name,
  setFile,
  value,
  initialPreview,
  selected,
  className,
}) {
  const [preview, setPreview] = useState(initialPreview);
  const inputRef = useRef();

  const handleFileChange = (e) => {
    const nextFile = e.target.files[0];
    if (nextFile) {
      setFile(name, [nextFile]);
    }
  };

  const handleClearClick = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      setFile(name, []);
    }
  };

  useEffect(() => {
    if (!value || !Array.isArray(value) || !(value[0] instanceof Blob)) return;

    const nextPreview = URL.createObjectURL(value[0]);
    setPreview((prev) => [...prev, nextPreview]);

    return () => {
      URL.revokeObjectURL(nextPreview);
      setPreview([]);
    };
  }, [value]);

  return (
    <div className={cn(styles.fileInput, className)}>
      <ImageBox
        isSelected={preview.length === 0 ? selected : !selected}
        imgUrl={preview || placeholderImg}
      />
      <input
        className={styles.hiddenOverlay}
        type="file"
        name={name}
        accept="image/*"
        onChange={handleFileChange}
        ref={inputRef}
      />
      {value.length !== 0 && (
        <button
          type="button"
          className={cn(styles.btn, styles.clearBtn)}
          onClick={handleClearClick}
        >
          <MdCancel />
        </button>
      )}
    </div>
  );
}

export default FileInput;
