'use strict';

module.exports = (app) => {
    const { router, controller } = app;
    var adminauth = app.middleware.adminauth();
    router.get('/index', controller.admin.home.index);
    router.post('/login', controller.admin.home.login);
    router.get('/getType', controller.admin.home.type);
    router.post('/addType', controller.admin.home.addtype);
    router.post('/updateType', controller.admin.home.updatetype);
    router.get('/deleteType/:id', controller.admin.home.deletetype);
    router.get('/getArticle', controller.admin.home.getArticle);
    router.post('/saveArticle', controller.admin.home.addArticle);
    router.post('/updateArticle', controller.admin.home.updateArticle);
    router.get('/deleteArticle/:id', controller.admin.home.deleteArticle);
    router.get('/getMusic', controller.admin.home.getMusic);
    router.post('/addMusic', controller.admin.home.addMusic);
    router.post('/updateMusic', controller.admin.home.updateMusic);
    router.get('/deleteMusic/:id', controller.admin.home.deleteMusic);
    router.get('/statistics', controller.admin.home.statistics);
    router.get('/getPie', controller.admin.home.getPie);
}