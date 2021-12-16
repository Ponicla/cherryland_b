const { Router } = require('express');
const fs  = require('fs');


const router = Router();


const sort_array = (list, prop_1, prop_2) => {
    return list.sort(function (a, b) {
        if (a[prop_1] > b[prop_1]) {
          return 1;
        }
        if (a[prop_1] < b[prop_1]) {
          return -1;
        }
        if (a[prop_2] > b[prop_2]) {
          return 1;
        }
        if (a[prop_2] < b[prop_2]) {
          return -1;
        }
        return 0;
      });
}

router.get('/', (req, res) => {
    res.send('Cherryland | backend');
});  

router.post('/files', async (req, res) => {
    var list = [];
    var { sub_route } = req.body;
    if(sub_route.length > 0){
        sub_route = sub_route+'/';
    }
    const route = 'C:/Users/usuario/Desktop/Juan/Cherryland/'+sub_route;
    fs.readdir(route, (error, files) => {
        if(error){ 
            throw error
        }else{
            if(files.length > 0){
                for (let i = 0; i < files.length; i++) {
                    var element = files[i];
                    var file = route+'/'+element;
                    var stat = fs.lstatSync(file);
                    if(stat.isDirectory() == true){
                        list.push({ order: 1, name: element, type: 'folder', icon: 'bi bi-folder' });
                    }else{
                        list.push({ order: 2, name: element, type: 'file', icon: 'bi bi-file-earmark-text' });
                    }
                    list = sort_array(list, 'order', 'name');
                    if( i == files.length -1){
                        res.json(list);
                    }
                }
            }else{
                res.json(list);
            } 
        } 
    });
}); 

/* router.post('/file', function (req, res) {
    var { sub_route, name } = req.body;
    var filePath = "C:/Users/usuario/Desktop/Juan/Cherryland/"+sub_route+'/'+name;
    open(filePath);
    res.json(filePath);
}); */

router.post('/file', function (req, res) {
    var { sub_route, name } = req.body;
    var filePath = "C:/Users/usuario/Desktop/Juan/Cherryland/"+sub_route+'/'+name;
    // open(filePath);
    res.sendFile(filePath);
});


module.exports = router;