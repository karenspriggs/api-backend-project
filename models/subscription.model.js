import mongoose from 'mongoose'

const subscriptionSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minlength: 2,
        maxlength: 100,
    },
    price:{
        type: Number,
        required: [true, 'Subscription price is required'],
        min: [0, "Price must be a positive integer"],
        max: [1000, "Price must be less than 1000."]
    },
    currency:{
        type: String,
        enum: ["USD", "EUR", "GBP"],
        default: "USD"
    },
    frequency:{
        type: String,
        enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category:{
        type: String,
        enum: ["Sports", "News", "Finance"],
        required: [true, 'Category is required'],
    },
    paymentMethod:{
        type: String,
        required: [true, 'Payment methods are required'],
        trim: true,
    },
    status:{
        type: String,
        enum: ["active", "cancelled", "expired"],
        default: "active",
    },
    startDate:{
        type: Date,
        required: [true, 'Start date is required'],
        validate:{
            validator: (value) => value <= new Date(),
            message: 'Start date must be in the past',
        }
    },
    renewalDate:{
        type: Date,
        required: [true, 'Renewal date is required'],
        validate:{
            validator: function(value){
                return value > this.startDate;
            },
            message: 'Renewal date must be after the start of the subscription',
        }
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
        index: true
    }
}, {timestamps: true});

// Auto calculate renewal date if it is missing
subscriptionSchema.pre("save", function(next) {
    if(!this.renewalDate){
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };

        this.renewalDate = new Date(this.startDate)
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    // Auto update status if renewal date has passed
    if (this.renewalDate < new Date()) {
        this.status = "expired";
    }

    next();
})

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;