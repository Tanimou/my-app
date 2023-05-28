import React from 'react';

import Image from 'next/image';

const SuccessMessage = ({ message }) => {
  return (
    <div className="success-message">
      <Image
        src="https://th.bing.com/th/id/R.bae8cc04f9529d2680ea51ab1a3de65e?rik=x%2boNY4waHUZACA&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fsuccess-transparent%2fsuccess-transparent-3.png&ehk=iFAwGY7pWBMJ3CoZuQogn5J1LZCSGXckYQF7fjZMGZo%3d&risl=&pid=ImgRaw&r=0"
        alt="Success"
        width={200}
        height={200}
      />
      <p>{message}</p>
      {/* Add any other content you want to display */}
    </div>
  );
};

export default SuccessMessage;