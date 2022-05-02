import Widgets from '@components/layout/footer/widget/widget';
import Copyright from '@components/layout/footer/copyright';
import { footer } from './data';
const { widgets, payment } = footer;

const Footer: React.FC = () => (
  <footer className="bg-white pt-10 lg:pt-14 2xl:pt-16">
    <Widgets widgets={widgets} />
    <Copyright payment={payment} />
    <div className="px-2 pb-4">
      <p className='text-center'>
    Click Games | E-commerce spécialiste du jeux vidéos | Choisissez votre univers | Des nombreuses promotions jusqu’à -70% | Livraison gratuite à partir de 35€ | Click sur ton jeu    
    </p>
    </div>
  </footer>
);

export default Footer;
