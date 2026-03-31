import { navbar1Registry, navbar2Registry, navbar3Registry, navbar5Registry } from '../sections/navbar';
import { sidebar1Registry } from '../sections/sidebar';
import { hero1Registry } from '../sections/hero';
import { cta1Registry } from '../sections/cta';
import { footer1Registry } from '../sections/footer';
import { gallery1Registry } from '../sections/gallery';

export const componentMap = [
  navbar1Registry,
  navbar2Registry,
  navbar3Registry,
  navbar5Registry,
  sidebar1Registry,
  hero1Registry,
  cta1Registry,
  footer1Registry,
  gallery1Registry,
] as const;