let idlist = [];

function addbutton(n, e, p) {
  let carddiv = document.createElement("div");
  carddiv.className =
    "w-[22rem] h-fit m-4 rounded-2xl bg-white shadow-2xl shadow-gray-900";
  carddiv.id = p;
  idlist.push(carddiv.id);

  maindiv.appendChild(carddiv);

  let coverphoto = document.createElement("img");
  coverphoto.src = "assets/cover-texture-37b65062.jpg"
  coverphoto.alt = "cover image"
  coverphoto.className =
    " h-[10rem] object-cover w-full rounded-t-2xl hidden lg:block";

  carddiv.appendChild(coverphoto);

  let detailscontainer = document.createElement("div");

  carddiv.appendChild(detailscontainer);

  let button = document.createElement("div");
  button.className = "flex justify-end mt-2 mr-2 ";

  detailscontainer.appendChild(button);

  let editbuttondiv = document.createElement("div");

  button.append(editbuttondiv);

  let edit_button = document.createElement("button");
  edit_button.className = "px-1";
  edit_button.addEventListener("click", function () {
    editcard(p);
  });

  editbuttondiv.append(edit_button);

  let edit_image = document.createElement("img");
  edit_image.src = "assets/editl.png";

  edit_button.appendChild(edit_image);

  let deletebuttondiv = document.createElement("div");

  button.appendChild(deletebuttondiv);

  let delete_button = document.createElement("button");
  delete_button.className = "px-1";
  delete_button.addEventListener("click", function () {
    document.getElementById(p).remove();
    deletefromstorage(p);
  });

  deletebuttondiv.appendChild(delete_button);

  let delete_image = document.createElement("img");
  delete_image.src = "assets/delete.png";

  delete_button.appendChild(delete_image);

  let detailscontainerdiv = document.createElement("div");

  detailscontainer.appendChild(detailscontainerdiv);

  let namediv = document.createElement("div");
  namediv.className = "px-5 pt-2 pb-2 text-4xl font-semibold text-center";

  detailscontainerdiv.appendChild(namediv);

  let name = document.createTextNode(n);
  namediv.appendChild(name);

  let emaildiv = document.createElement("div");
  detailscontainer.appendChild(emaildiv);

  let email = document.createElement("div");
  email.className = "text-lg py-1  text-center";

  emaildiv.appendChild(email);

  let emailtext = document.createTextNode(e);

  email.appendChild(emailtext);

  let phonecontainerdiv = document.createElement("div");
  detailscontainerdiv.appendChild(phonecontainerdiv);

  let phonediv = document.createElement("div");
  phonediv.className = "text-lg py-1  text-center";

  phonecontainerdiv.appendChild(phonediv);

  let phonenum = document.createTextNode(p);

  phonediv.appendChild(phonenum);

  let contacts_container_div = document.createElement("div");
  contacts_container_div.className = "flex justify-center mt-6 pb-7";

  detailscontainer.appendChild(contacts_container_div);

  let phone_container = document.createElement("div");
  phone_container.className = "px-3";

  contacts_container_div.appendChild(phone_container);

  let phone_link = document.createElement("a");
  phone_link.href = "tel:+91 "+ p

  phone_container.appendChild(phone_link);

  let phone_image = document.createElement("img");
  phone_image.src = "assets/telephone.png";

  phone_link.appendChild(phone_image);

  let email_conatainer = document.createElement("div");
  email_conatainer.className = "px-3";

  contacts_container_div.appendChild(email_conatainer);

  let email_link = document.createElement("a");
  email_link.href = "mailto:" + e

  email_conatainer.appendChild(email_link);

  let email_image = document.createElement("img");
  email_image.src = "assets/email.png";

  email_link.appendChild(email_image);

  let destination = document.getElementById("maindiv");
  destination.appendChild(carddiv);

  destination.style.display = "flex";
}

function formvalidation() {
  var name1 = document.getElementById("name");
  var email = document.getElementById("email");
  var phone = document.getElementById("phone");

  const emailregx = /^([a-z0-9\.-]+)@([a-z]+\.)([a-z]{2,8})(.[a-z]{2,8})?$/;
  const nameregx = /^[a-zA-Z ]+$/;
  const phoneregx = /^[7-9]\d{9}$/;

  if (nameregx.test(name1.value) === !true) {
    document.getElementById("nameerror").style.display = "block";
  } else {
    document.getElementById("nameerror").style.display = "none";

    if (emailregx.test(email.value) === !true) {
      document.getElementById("emailerror").style.display = "block";
    } else {
      document.getElementById("emailerror").style.display = "none";
      if (phoneregx.test(phone.value) === !true) {
        document.getElementById("phoneerror").style.display = "block";
      } else {
        document.getElementById("phoneerror").style.display = "none";
        if (flag === "edited") {
          if (name1.value !== namecheck || email.value !== emailcheck) {
            if (name1.value !== namecheck) {
              let listitem = JSON.parse(localStorage.getItem("details"));
              for (let i = 0; i < listitem.length; i++) {
                if (JSON.parse(listitem[i]).phone === identifier) {
                  var listitem1 = JSON.parse(listitem[i]);
                  listitem1.name = name1.value.toUpperCase();
                  var index = i;
                  break;
                }
              }
              let data = JSON.stringify(listitem1);

              listitem[index] = data;

              let data2 = JSON.stringify(listitem);

              localStorage.setItem("details", data2);

              for (let i of idlist) {
                document.getElementById(i).remove();
              }
              idlist = [];

              loadcard();
            }
            if (email.value !== emailcheck) {
              var matchfound = duplicateusercheckemail(email.value);

              if (matchfound === 1) {
                document.getElementById("twoduplicate").style.display = "block";
                document.getElementById("nochangemade").style.display = "none";
              } else {
                let listitem = JSON.parse(localStorage.getItem("details"));
                for (let i = 0; i < listitem.length; i++) {
                  if (JSON.parse(listitem[i]).phone === identifier) {
                    var listitem1 = JSON.parse(listitem[i]);

                    listitem1.email = email.value;
                    var index = i;
                  }
                }
                let data = JSON.stringify(listitem1);
                listitem[index] = data;
                let data2 = JSON.stringify(listitem);

                localStorage.setItem("details", data2);
                for (let i of idlist) {
                  document.getElementById(i).remove();
                }
                idlist = [];
                loadcard();
              }
            }
          } else if (name1.value === namecheck && email.value === emailcheck) {
            document.getElementById("twoduplicate").style.display = "none";
            document.getElementById("nochangemade").style.display = "block";
          }
        } else {
          var check = duplicateusercheck(email.value, phone.value);

          if (check === 1) {
            localstorage(name1.value.toUpperCase(), email.value, phone.value);
          } else {
            document.getElementById("twoduplicate").style.display = "block";
            document.getElementById("nochangemade").style.display = "none";
          }
        }
      }
    }
  }
}
function localstorage(nametext, email, phone) {
  let object = {
    name: nametext,
    email: email,
    phone: phone,
  };
  object = JSON.stringify(object);
  var arr = [];
  
  if (localStorage.getItem("details") === null) {
    
    arr = [];
  } else {
    arr = JSON.parse(localStorage.getItem("details"));
  }
  arr.push(object);

  let data = JSON.stringify(arr);

  localStorage.setItem("details", data);
  arr = JSON.parse(localStorage.getItem("details"));

  addbutton(nametext, email, phone);

  document.getElementById("reg-box").style.display = "none";
}

function regformopen() {
  document.getElementById("twoduplicate").style.display = "none";
  flag = "";
  document.getElementById("phone").readOnly = false;
  document.getElementById("nochangemade").style.display = "none";
  document.getElementById("reg-box").style.display = "flex";
  document.getElementById("maindiv").style.display = "none";
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("email").value = "";
}

loadcard();
function loadcard() {
  var arr = [];
  if (localStorage.getItem("details") === null) {
    arr = [];
  } else {
    arr = JSON.parse(localStorage.getItem("details"));
  }
  // arr = JSON.parse(localStorage.getItem("details"));
  
  if(arr.length > 0){
    for (let i = 0; i < arr.length; i++) {
      var nameid = JSON.parse(arr[i]).name;
      var emailid = JSON.parse(arr[i]).email;
      var phoneid = JSON.parse(arr[i]).phone;
  
      addbutton(nameid, emailid, phoneid);
    }
    document.getElementById("reg-box").style.display = "none";
  }
  
}

function deletefromstorage(p) {
  var newlist = JSON.parse(localStorage.getItem("details"));
  for (let i = 0; i < newlist.length; i++) {
    let idvalue = newlist[i].p;
    if (idvalue === p) {
      var itemtoremove = newlist[i];
      break;
    }
  }
  newlist.splice(newlist.indexOf(itemtoremove), 1);
  if(newlist.length === 0){
    localStorage.clear()
  }else{
    localStorage.setItem("details", JSON.stringify(newlist));
  }
  
}

function duplicateusercheck(e, p) {
  var newlist1 = JSON.parse(localStorage.getItem("details"));
  if (newlist1 === null) {
    localstorage(
      document.getElementById("name").value.toUpperCase(),
      email.value,
      phone.value
    );
    
  } else {
    var hello = 0;
    for (let i = 0; i < newlist1.length; i++) {
      var newlist2 = JSON.parse(newlist1[i]);
      let phonevalue = newlist2.phone;
      let emailvalue = newlist2.email;

      if (emailvalue === e || phonevalue === p) {
        hello = 3;
        break;
      } else {
        hello = 1;
      }
    }
    return hello;
  }
}

function duplicateusercheckemail(e) {
  var newlist1 = JSON.parse(localStorage.getItem("details"));
  var alex = 0;
  for (let i = 0; i < newlist1.length; i++) {
    var newlist2 = JSON.parse(newlist1[i]);

    let emailvalue = newlist2.email;

    if (emailvalue === e) {
      alex = 1;
      break;
    } else {
      alex = 0;
    }
  }
  return alex;
}
var flag = "";
var namecheck;
var emailcheck;
var phonecheck;
var identifier;

function editcard(id) {
  flag = "edited";
  identifier = id;
  document.getElementById("twoduplicate").style.display = "none";
  document.getElementById("reg-box").style.display = "flex";
  document.getElementById("maindiv").style.display = "none";

  let listitem = JSON.parse(localStorage.getItem("details"));
  for (let i = 0; i < listitem.length; i++) {
    var listitem1 = JSON.parse(listitem[i]);
    let checker = listitem1.phone;

    document.getElementById("phone").readOnly = true;
    if (checker === id) {
      document.getElementById("name").value = listitem1.name;
      document.getElementById("email").value = listitem1.email;
      document.getElementById("phone").value = listitem1.phone;
    }
  }
  namecheck = document.getElementById("name").value;
  emailcheck = document.getElementById("email").value;
  phonecheck = document.getElementById("phone").value;
}
