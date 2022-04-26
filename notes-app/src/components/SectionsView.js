import React from 'react';
import SectionItem from './SectionItem';
import SectionsTopBar from './SectionsTopBar';

function SectionsView(props) {
  return (
    <div>
      <SectionsTopBar />

      {Object.keys(props.sections).map((key, index) => {
        return (
          <SectionItem key={index}
            section={props.sections[key]}
            deleteSection={props.deleteSection}
            loadSectionNotes={props.loadSectionNotes}
            setSectionInView={props.setSectionInView}
            goToMenu="sectionNotes"
            setActiveMenu={props.setActiveMenu}
          />
        )
      })}
    </div>
  )
}

export default SectionsView;