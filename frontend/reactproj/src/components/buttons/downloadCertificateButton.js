import axios from 'axios';
import PrimaryButton from './primaryBtn';

const CertificateButton = (props) => {
  const getCertificate = async () => {
    axios
      .get('http://localhost:5000/users/certificate', {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/pdf'
        },
        params: { courseId: props.courseId || '638281a7b05c30a726283c28' }
      })
      .then(async (res) => {
        if (res.status === 200) {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'Certificate.pdf');
          document.body.appendChild(link);
          link.click();
        }
      });
  };
  return <PrimaryButton btnText={'Download Certificate'} function={getCertificate} />;
};

export default CertificateButton;
