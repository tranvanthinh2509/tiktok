import { forwardRef, useState } from 'react';
import images from '../../asset/image';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Image = forwardRef(({ src, alt, id = '', className, ...props }, ref) => {
    const [fallback, setFallback] = useState('');

    const handleError = () => {
        setFallback(images.noImage);
    };

    return (
        <div>
            {src ? (
                <img
                    ref={ref}
                    src={src || fallback}
                    alt={alt}
                    id={id}
                    className={className}
                    {...props}
                    onError={handleError}
                />
            ) : (
                <div className={className}>
                    <Skeleton className={className} />
                </div>
            )}
        </div>
    );
});

export default Image;
