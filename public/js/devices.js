/*
var Devices = function() {
    this.devices = [];
};

Devices.prototype.addDevice = function(device) {
    this.devices.push(device);
};

Devices.prototype.each = function(callback) {
    var returnValue = undefined;
    for (var i = 0; i < this.devices.length; i++) {
        console.log("In Devices each an Pos "+i);
        returnValue = callback(this.devices[i], i, this.devices);
        console.log("Return Value:");
        console.log(returnValue);

        if (undefined !== returnValue) {
            console.log("Habe device! Springe raus!");
            return returnValue;
        }
    }
    console.log("Erledigt! Ergebnis war:");
    console.log(returnValue);
    return returnValue;
};

Devices.prototype.removeDevice = function(device) {
    //this.devices.splice(this.searchDevice(device), 1);
    console.log("Suche UniqueId "+device.getUniqueId());
    this.each(function(currentDevice, index) {
        if (currentDevice.getUniqueId() == device.getUniqueId) {
            this.devices.slice(index, 1);
        }
    })
};

Devices.prototype.removeDeviceByElement = function(element) {
    if (undefined === jQuery(element).data('unique-id')) {
        console.log("UNIQUE ID NOT SET!");
        return false;
    }
    var devices = this.devices;
    console.log("REMOVE DEVICE!");
    console.log(element);
    console.log("Suche UniqueId "+jQuery(element).data('unique-id'));

    this.each(function(device, key) {
        if (undefined !== device
            && jQuery(element).data('unique-id') == device.getUniqueId()
        ) {
            console.log("HABE DEVICE by key "+key);
            devices.slice(key, 1);
            return false;
        }
    });
    this.devices = devices;
};

Devices.prototype.searchDevice = function(device) {
    return this.devices.indexOf(device);
};

Devices.prototype.searchDeviceByElement = function(element) {
    var devices = this.devices;
    var device = "nix";
    console.log("SUCHE "+jQuery(element).data('unique-id'));

    this.each(function(device, key) {
        console.log("Key in searchDeviceByElement in Devices: "+key);
        if (undefined !== device
            && jQuery(element).data('unique-id') == device.getUniqueId()
        ) {
            console.log("HABE DEVICE by key "+key+"!!!!!");
            console.log(devices[key]);
            device = devices[key];
            return devices[key];
        }
    });
    console.log("Ende in SearchDeviceByElement von Devices!");
    console.log("DEVICE:");
    console.log(device);
    //return device;
    return typeof device === 'object' ? device : undefined;
};

Object.defineProperty(
    Devices.prototype, 'length', {
        get: function() {
            return this.devices.length;
        }
    }
);
*/

/*
var Devices = {
    devices: [],
    addDevice: function (device)  {
        this.devices.push(device);
    },
    each: function(callback) {
        var returnValue = undefined;
        for (var i = 0; i < this.devices.length; i++) {
            console.log("In Devices each an Pos "+i);
            returnValue = callback(this.devices[i], i, this.devices);
            console.log("Return Value:");
            console.log(returnValue);

            if (undefined !== returnValue) {
                console.log("Habe device! Springe raus!");
                return returnValue;
            }
        }
        console.log("Erledigt! Ergebnis war:");
        console.log(returnValue);
        return returnValue;
    },
    removeDevice: function(device) {
        //this.devices.splice(this.searchDevice(device), 1);
        console.log("Suche UniqueId "+device.getUniqueId());
        this.each(function(currentDevice, index) {
            if (currentDevice.getUniqueId() == device.getUniqueId) {
                this.devices.slice(index, 1);
            }
        });
    },
    removeDeviceByElement: function(element) {
        if (undefined === jQuery(element).data('unique-id')) {
            console.log("UNIQUE ID NOT SET!");
            return false;
        }
        var devices = this.devices;
        console.log("REMOVE DEVICE!");
        console.log(element);
        console.log("Suche UniqueId "+jQuery(element).data('unique-id'));

        this.each(function(device, key) {
            if (undefined !== device
                && jQuery(element).data('unique-id') == device.getUniqueId()
            ) {
                console.log("HABE DEVICE by key "+key);
                devices.slice(key, 1);
                return false;
            }
        });
        this.devices = devices;
    },
    searchDevice: function(device) {
        return this.devices.indexOf(device);
    },
    searchDeviceByElement: function(element) {
        var devices = this.devices;
        var device = "nix";
        console.log("SUCHE "+jQuery(element).data('unique-id'));

        this.each(function(device, key) {
            console.log("Key in searchDeviceByElement in Devices: "+key);
            if (undefined !== device
                && jQuery(element).data('unique-id') == device.getUniqueId()
            ) {
                console.log("HABE DEVICE by key "+key+"!!!!!");
                console.log(devices[key]);
                device = devices[key];
                return devices[key];
            }
        });
        console.log("Ende in SearchDeviceByElement von Devices!");
        console.log("DEVICE:");
        console.log(device);
        //return device;
        return typeof device === 'object' ? device : undefined;
    },
    length: function() {
        return this.devices.length;
    }
};
*/


function Devices () {
    this.devices = [];
    this.searchResult = undefined;
    this.addDevice = function (device)  {
        this.devices.push(device);
    };

    this.each = function(callback) {
        for (var i = 0; i < this.devices.length; i++) {
            this.searchResult = callback(this.devices[i], i, this.devices);
            if (undefined !== this.searchResult) {
                return false;
            }
        }
        return this;
    };

    this.removeDevice = function(device) {
        this.devices.splice(this.searchDevice(device), 1);
        //console.log("Suche UniqueId "+device.getUniqueId()+" für remove");
        //console.log("Devices vorm löschen:");
        //console.log(this.devices);
        var self = this;
        this.each(function(currentDevice, index) {
            if (currentDevice.getUniqueId() == device.getUniqueId()) {
                //console.log("Unique ID gefunden! LÖSCHE!");
                self.devices.splice(index, 1);
                //delete self.devices[index];
            }
        });
        return this;
        //console.log("Devices:");
        //console.log(this.devices);
    };

    this.removeDeviceByElement = function(element) {
        if (undefined === jQuery(element).data('unique-id')) {
            //console.log("UNIQUE ID NOT SET!");
            return false;
        }
        var devices = this.devices;
        //console.log("REMOVE DEVICE!");
        //console.log(element);
        //console.log("Suche UniqueId "+jQuery(element).data('unique-id'));

        this.each(function(device, key) {
            if (undefined !== device
                && jQuery(element).data('unique-id') == device.getUniqueId()
            ) {
                //console.log("HABE DEVICE by key "+key);
                this.devices.splice(key, 1);
                //delete self.devices[index];
                return false;
            }
        });
        this.devices = devices;
        return this;
    };

    this.searchDevice = function(device) {
        //console.log("Suche UniqueId "+device.getUniqueId());
        this.each(function(currentDevice, index) {
            if (currentDevice.getUniqueId() == device.getUniqueId()) {
                //console.log("Unique ID gefunden!");
                return currentDevice;
            }
        });

        //return this.devices.indexOf(device);
        return this;
    };

    this.searchDeviceByElement = function(element) {
        var devices = this.devices;
        var device = "nix";

        this.each(function(device, key) {
            if (undefined !== device
                && jQuery(element).data('unique-id') == device.getUniqueId()
            ) {
                this.searchResult = devices[key];
                return this.searchResult;
            }
        });
        return this.searchResult;
    };

    this.length = function() {
        return this.devices.length;
    };
}
