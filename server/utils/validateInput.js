const validateInput = {
  validate: function (format, data) {
    for (var key in format) {
      var entry = format[key];
      var validator;
      if (typeof entry === 'object') {
        if (entry.nullable) {
          if (data[key] === undefined || data[key] === null) {
            continue;
          }
        }
        if (typeof entry.default !== 'undefined') {
          if (typeof data[key] === 'undefined') {
            data[key] = entry.default;
          }
        }
        validator = entry.validator;
      } else if (typeof entry === 'function') {
        validator = entry;
      } else {
        return 'malformed validation entry';
      }

      if (!validator(data[key])) {
        return 'Value "' + data[key] + '" for key "' + key + '" is invalid';
      }
    }
    return null;
  },

  email: function (email) {
    if (typeof email !== 'string') {
      return false;
    }

    if (email.length < 5 || email.length > 200) {
      return false;
    }

    var regex =
      /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.([a-z]+)|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    return !!email.match(regex);
  },

  integer: (value) => {
    if (typeof value !== 'number' && typeof value !== 'string') {
      return false;
    }
    var n = Number(value);
    return Number.isInteger(n) && n >= 0;
  },

  oneOf: (array) => (value) => {
    for (var i = 0; i < array.length; i++) {
      const item = array[i];
      if (item === value) {
        return true;
      }
    }
    return false;
  },
};

export default validateInput;
