/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$("#menuTela ul").on("click", "li", function(){
   
   $("#menuTela ul li").removeClass("active");
   
   $(this).addClass("active");
});