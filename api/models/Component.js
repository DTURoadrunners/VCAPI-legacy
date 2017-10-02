var ComponentSchema = new Schema({
	status : {
		type: String,
		enum: ['Stored', 'In-use', 'Broken', 'Expired']
	},
	comment : String,
	timestamp : Date
})
