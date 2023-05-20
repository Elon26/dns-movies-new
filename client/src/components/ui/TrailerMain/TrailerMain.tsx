import React, { FC, useState } from "react";
import styles from "./Trailer.module.scss";
import ReactPlayer from "react-player";
import Modal from "../../common/Modal/Modal";

const TrailerMain: FC<{
    trailer?: string;
    content?: React.ReactNode;
}> = ({ trailer, content = "Трейлер" }) => {
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <>
            <>
                <div
                    className={styles.Content}
                    onClick={() => setVisible(true)}
                >
                    {content}
                </div>
                <Modal
                    data-testid="modal"
                    callback={() => setVisible(false)}
                    visible={visible}
                >
                    <div className={styles.Trailer}>
                        {trailer?.includes("youtube") ? (
                            <ReactPlayer url={trailer} />
                        ) : (
                            <ReactPlayer
                                url={
                                    "https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=1s&ab_channel=RickAstley"
                                }
                            />
                        )}
                    </div>
                </Modal>
            </>
        </>
    );
};

export default TrailerMain;
