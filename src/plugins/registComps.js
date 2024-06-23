import MyTabBar from "@/components/MyTabBar";
import NoData from '@/components/NoData'
export default {
  install(app) {
    app.component('MyTabBar',MyTabBar);
    app.component('NoData',NoData);
  }
};