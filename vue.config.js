module.exports = {
    devServer: {
        // Cambiar a true permite acceder desde la red local
        host: '0.0.0.0',
        port: 8081,
        disableHostCheck: true,
        https: false, // Si es necesario, cambia esto a true para habilitar HTTPS
    },

    // Configuración para la construcción de la app
    publicPath: '/', // Especifica el path base de tu app cuando se sirva en producción

    // Configuración para la salida de los archivos de la construcción
    outputDir: 'dist', // La carpeta donde se colocan los archivos compilados, debe coincidir con la carpeta webDir de Capacitor

    // Si necesitas configurar algo relacionado con los loaders de webpack, puedes hacerlo aquí
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'), // Crear alias para una mejor gestión de las rutas
            },
        },
    },

    // Puedes personalizar más aspectos del proceso de construcción de Vue
    chainWebpack: (config) => {
        // Aquí puedes hacer modificaciones específicas a los webpack configurados por Vue CLI
        config.plugin('html').tap((args) => {
            args[0].title = 'My Capacitor App'; // Cambiar el título en el index.html
            return args;
        });
    },

    // Configuración para PWA si decides agregar soporte para PWA (Progressive Web App)
    pwa: {
        name: 'My Capacitor App',
        themeColor: '#42b983', // Color de la barra de estado
        msTileColor: '#000000',
        iconPaths: {
            favicon32: 'img/icons/favicon-32x32.png',
            favicon16: 'img/icons/favicon-16x16.png',
            appleTouchIcon: 'img/icons/apple-icon-152x152.png',
            maskIcon: 'img/icons/safari-pinned-tab.svg',
            msTileImage: 'img/icons/ms-icon-144x144.png',
        },
    },
}
