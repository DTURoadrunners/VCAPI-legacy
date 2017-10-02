var ProjectSchema = new Schema({
	name: {
		type: string,
		required: "Projects must have a name"
	},
	creation_date: {
		type: Date,
		default: Date.now 
	},
	users: [Users],
	log: [LogEntries]
	component_type: [ComponentType]

});
