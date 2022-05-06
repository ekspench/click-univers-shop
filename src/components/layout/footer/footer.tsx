import Widgets from '@components/layout/footer/widget/widget';
import Copyright from '@components/layout/footer/copyright';
import { footer } from './data';
const { widgets, payment } = footer;

const Footer: React.FC = () => (
  <footer className="bg-white pt-10 lg:pt-14 2xl:pt-16">
    <Widgets widgets={widgets} />
    <Copyright payment={payment} />
    <div className="px-2 pb-4">
     
    </div>
  </footer>
);

export default Footer;
