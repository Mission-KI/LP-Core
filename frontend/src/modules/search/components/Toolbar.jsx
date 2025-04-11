import React, { useState } from "react";
import { Gear, Star, StarFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import SettingsModal from "../../common/components/SettingsModal/SettingsModal";
import LanguageSelector from "../../common/components/widgets/LanguageSelector";
import { useBookmarks } from "../../bookmarks/contexts/BookmarksContext";

const Toolbar = () => {
  const { bookmarks } = useBookmarks();
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  return (
    <>
      <div className="d-none d-md-flex align-items-center position-relative">
        <LanguageSelector />
      </div>
      <div className="px-2 d-none d-md-block">
        <span
          onClick={() => setShowSettingsModal(true)}
          className="btn-hover px-2 h-100 d-flex align-items-center pointer"
        >
          <Gear className="h5 m-0" />
        </span>
      </div>
      <div className="d-none d-md-block">
        <Link
          to="/bookmarks"
          className="btn-hover px-2 h-100 d-flex align-items-center txt-regular"
        >
          {bookmarks.length > 0 ? (
            <StarFill className="h5 m-0" />
          ) : (
            <Star className="h5 m-0" />
          )}
        </Link>
      </div>

      <SettingsModal
        showSettingsModal={showSettingsModal}
        setShowSettingsModal={setShowSettingsModal}
      />
    </>
  );
};

export default Toolbar;
