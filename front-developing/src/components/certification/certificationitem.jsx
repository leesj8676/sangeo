import React, {useState} from 'react';

import { MdRemoveCircleOutline} from 'react-icons/md';

function CertificationItem({todo, onRemove}) {
    
   const {id, text} = todo;
    return (
        <div>
        <li>
            <div className="text">{text}</div>
            <div className="remove" onClick={() => onRemove(id)}>
                <MdRemoveCircleOutline />
            </div>
        </li>
      </div>
    )
}

export default CertificationItem;
