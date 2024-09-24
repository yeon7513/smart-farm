import cn from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { MdCancel } from 'react-icons/md';
import placeholderImg from '../../../assets/member/basic_profile.png';
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
  if (typeof value === 'string') {
    value = null;
  }

  const [preview, setPreview] = useState(initialPreview);
  const inputRef = useRef();

  const handleFileChange = (e) => {
    const nextFile = e.target.files[0];
    setFile(name, nextFile);
  };

  const handleClearClick = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      setFile(name, null);
    }
  };

  useEffect(() => {
    if (!value) return;

    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    return () => {
      setPreview(null);
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);

  return (
    <div className={cn(styles.fileInput, className)}>
      <ImageBox
        isSelected={preview ? !selected : selected}
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
      {value && (
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
