import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: [String],
        trim: true
    },
    publisher: {
        type: String,
        trim: true
    },
    publishedDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    pagesNumber: {
        type: Number,
        required: true,
        min: 1
    },
    type: {
        type: [String],
        required: true
    },
    format: {
        type: String,
        enum: ['Hardcover', 'Paperback', 'Ebook', 'Audiobook', 'Other'],
    },
    saga: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    salesNumber: {
        type: Number,
        default: 0,
        min: 0
    },
    bookRef: {
        classification: {
            type: String,
            required: true,
            enum: ['ISBN', 'ASIN', 'Other']
        },
        code: {
            type: String,
            unique: true,
        }
    }
});

bookSchema.pre('save', async function(next) {
    if (this.bookRef.classification === 'Other' && !this.bookRef.code) {
        const prefix = this.title.substring(0, 3).toUpperCase();
        // Find existing codes with the same prefix
        const regex = new RegExp(`^${prefix}(\\d+)$`);
        const books = await mongoose.model('Book').find({ 'bookRef.code': regex });
        // Find the max number used so far
        let maxNum = 0;
        books.forEach(book => {
            const match = book.bookRef.code.match(/^.{3}(\d+)$/);
            if (match) {
                const num = parseInt(match[1], 10);
                if (num > maxNum) maxNum = num;
            }
        });
        this.bookRef.code = `${prefix}${maxNum + 1}`;
    }
    next();
});

bookSchema.statics.getStats = function () {
  return this.aggregate([
    {
      $group: {
        _id: "$format",
        totalBooks: { $sum: 1 },
        avgPrice: { $avg: "$price" },
        totalSales: { $sum: "$salesNumber" }
      }
    },
    {
      $sort: { totalBooks: -1 }
    }
  ]);
};

bookSchema.index({ title: 'text', author: 'text', description: 'text' });
bookSchema.index({ salesNumber: -1 });
bookSchema.index({ publishedDate: -1 });

const Book = mongoose.model('Book', bookSchema);

export default Book;