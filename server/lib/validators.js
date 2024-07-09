import { body, check, param, query, validationResult } from "express-validator"
import { ErrorHandler } from "../utils/utility.js";

const validateHandler = (req,res,next)=>{
    const errors = validationResult(req);

    const errormessages = errors.array().map((error)=>error.msg).join(",")
    //console.log(errormessages);

    if(errors.isEmpty()) return next();

    else
    next(new ErrorHandler(errormessages,400));
    

}

const registerValidator = ()=>[
    
    body("name","Please enter name").notEmpty(),
    body("username","Please enter username").notEmpty(),
    body("bio","Please enter bio").notEmpty(),
    body("password","Please enter password").notEmpty(),
   // check("avatar","Please upload avatar").notEmpty()


]

const loginValidator= ()=>[
    
    body("username","Please enter username").notEmpty(),
    body("password","Please enter password").notEmpty()
]

const newGroupValidator = ()=>[
    body("name","Please enter name").notEmpty(),
    body("members").notEmpty()
    .withMessage("Please Enter members")
    .isArray({min:2,max:10})
    .withMessage("Members must be 2-100")
]

const addMemberValidator = ()=>[
    body("chatId","Please enter ChatID").notEmpty(),
    body("members").notEmpty()
    .withMessage("Please Enter members")
    .isArray({min:1,max:97})
    .withMessage("Members must be 2-100")
];

const removeMemberValidator = ()=>[
    body("chatId","Please enter ChatID").notEmpty(),
    body("userId","Please Enter UserId").notEmpty()
];


const sendAttachmentsValidator =()=>[
body("chatId","Please enter ChatID").notEmpty()

]

const getMessagesValidator =()=>[
    param("id","Please enter ChatID").notEmpty(),
    query("page").notEmpty()
  ]
    
const chatIdValidator =()=>[
    param("id","Please enter ChatID").notEmpty()
   
  ]

const renameValidator =()=>[
    param("id","Please enter ChatID").notEmpty(),
    body("name", "Please Enter New Name").notEmpty(),
   
  ]

  const sendRequestValidator =()=>[
   
    body("userId", "Please Enter userId").notEmpty(),
   
  ]

  const acceptRequestValidator =()=>[
   
    body("requestId", "Please Enter requestId").notEmpty(),
      
    body("accept")
    .notEmpty()
    .withMessage("Please add accept")
    .isBoolean()
    .withMessage("Accept must be a boolean")
   
  ]


  const adminLoginValidator = ()=>[

    body("secretKey","Please Enter secretKey").notEmpty()

  ]
export {registerValidator,validateHandler,loginValidator,newGroupValidator,addMemberValidator,removeMemberValidator,sendAttachmentsValidator,
    getMessagesValidator,
    chatIdValidator,
    renameValidator,
    sendRequestValidator,
    acceptRequestValidator,
    adminLoginValidator

}

