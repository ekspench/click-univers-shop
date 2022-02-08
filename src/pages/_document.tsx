import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { i18n } from "next-i18next";
require('dayjs/locale/fr');
export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return await Document.getInitialProps(ctx);
  }
  render() {
    const { locale } = this.props.__NEXT_DATA__;
    const dir = locale === "ar" || locale === "he" ? "rtl" : "ltr";
    if (process.env.NODE_ENV !== "production") {
      i18n!.reloadResources("locale");
    }
    return (
      <Html>
        <Head>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>
        <body dir={dir}>
          <Main />
          <NextScript />
        </body>

        <script
          type="text/javascript"
          src="//ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"
        ></script>

        <script
          type="text/javascript"
          src="//unpkg.com/leaflet/dist/leaflet.js"
        ></script>
        <link
          rel="stylesheet"
          type="text/css"
          href="//unpkg.com/leaflet/dist/leaflet.css"
        />
        <script
          type="text/javascript"
          src="https://widget.mondialrelay.com/parcelshop-picker/jquery.plugin.mondialrelay.parcelshoppicker.min.js"
        ></script>
      </Html>
    );
  }
}
