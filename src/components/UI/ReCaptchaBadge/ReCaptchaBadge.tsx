import classes from './ReCaptchaBadge.module.css';
import reCaptchaIcon from '../../../assets/recaptcha_logo.png';

interface ReCaptchaBadgeProps {
  align: string;
}

const ReCaptchaBadge: React.FC<ReCaptchaBadgeProps> = ({ align }) => {
  return (
    <div
      className={`${classes.recap} ${
        align == 'left' ? classes.left : classes.center
      }`}
    >
      <div className={classes.image}>
        <img src={reCaptchaIcon} alt="" />
      </div>
      <div className={classes.disclaimer}>
        <p>
          This site is protected by reCAPTCHA and the Google
          <a href="https://policies.google.com/privacy">Privacy Policy</a>
          &nbsp;and
          <a href="https://policies.google.com/terms">&nbsp;Terms of Service</a>
          &nbsp;apply.
        </p>
      </div>
    </div>
  );
};

export default ReCaptchaBadge;
